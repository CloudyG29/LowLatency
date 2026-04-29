const express = require('express');
const router = express.Router();
const prisma = require('../../DB_connect/prisma');

// GET: /api/profile/:firebase_uid
// Fetches the user and all nested profile data (skills, qualifications)
async function getUserProfile(req, res) {
    const { firebase_uid } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { firebase_uid: firebase_uid },
            include: {
                provider: true,
                applicant: {
                    include: {
                        // Fetch the joining table AND the actual Skill data
                        skills: {
                            include: { skill: true }
                        },
                        // Fetch the joining table AND the actual Qualification data
                        qualifications: {
                            include: { qualification: true }
                        }
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User profile not found." });
        }

        // Clean up the response payload so the frontend has an easier time reading it
        const responseData = { ...user };
        console.log("Fetched user profile data:", responseData);

        // Flatten qualifications and skills for easier frontend mapping
        if (responseData.applicant) {
            responseData.applicant.formattedQualifications = responseData.applicant.qualifications.map(q => ({
                id: q.id,
                name: q.qualification.name,
                nqf_level: q.qualification.nqf_level,
                institution: q.institution,
                year_completed: q.year_completed
            }));

            responseData.applicant.formattedSkills = responseData.applicant.skills.map(s => ({
                id: s.id,
                name: s.skill.name,
                nqf_level: s.skill.nqf_level
            }));

            delete responseData.applicant.qualifications;
            delete responseData.applicant.skills;
        }

        res.status(200).json(responseData);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal server error while fetching profile." });
    }
}

// PUT: /api/profile/:firebase_uid
async function updateUserProfile(req, res) {
    const { firebase_uid } = req.params;

    // Extracting all possible fields from the frontend payload
    const {
        name,
        surname,
        phone,
        dob,
        bio,
        qualifications, // Array of education objects
        skills          // Array of skill objects (optional, if you have this section)
    } = req.body;

    try {
        // 1. Verify user exists
        const existingUser = await prisma.user.findUnique({
            where: { firebase_uid: firebase_uid },
        });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found." });
        }

        // 2. Update base User table
        await prisma.user.update({
            where: { firebase_uid: firebase_uid },
            data: {
                name: name !== undefined ? name : existingUser.name,
                surname: surname !== undefined ? surname : existingUser.surname,
            }
        });

        // 3. Update Applicant Profile & Relations
        if (existingUser.role === 'Applicant') {
            const parsedDob = dob ? new Date(dob) : undefined;

            // Upsert creates the profile if it doesn't exist, or updates it if it does
            const updatedApplicantProfile = await prisma.applicantProfile.upsert({
                where: { user_id: existingUser.user_id },
                update: {
                    phone: phone !== undefined ? phone : undefined,
                    bio: bio !== undefined ? bio : undefined,
                    dob: parsedDob !== undefined ? parsedDob : undefined,
                },
                create: {
                    user_id: existingUser.user_id,
                    phone: phone || null,
                    bio: bio || null,
                    dob: parsedDob || null,
                }
            });

            // --- 4. Handle Qualifications (Wipe and Replace) ---
            if (qualifications && Array.isArray(qualifications)) {

                // Wipe old joining records
                await prisma.applicantQualification.deleteMany({
                    where: { applicant_id: updatedApplicantProfile.applicant_id }
                });

                // Insert new ones
                for (let edu of qualifications) {
                    // Find or create the base Qualification
                    let baseQual = await prisma.qualification.findFirst({
                        where: {
                            name: edu.name || "Unknown Qualification",
                            nqf_level: edu.nqf_level
                        }
                    });

                    if (!baseQual) {
                        baseQual = await prisma.qualification.create({
                            data: {
                                name: edu.name || "Unknown Qualification",
                                nqf_level: edu.nqf_level
                            }
                        });
                    }

                    // Link it to the applicant
                    await prisma.applicantQualification.create({
                        data: {
                            applicant_id: updatedApplicantProfile.applicant_id,
                            qualification_id: baseQual.qualification_id,
                            institution: edu.institution,
                            year_completed: edu.year_completed
                        }
                    });
                }
            }

            // --- 5. Handle Skills (Wipe and Replace) ---
            if (skills && Array.isArray(skills)) {

                // Wipe old joining records
                await prisma.applicantSkill.deleteMany({
                    where: { applicant_id: updatedApplicantProfile.applicant_id }
                });

                // Insert new ones
                for (let skillData of skills) {
                    // Find or create the base Skill
                    let baseSkill = await prisma.skill.findFirst({
                        where: {
                            name: skillData.name
                        }
                    });

                    if (!baseSkill) {
                        baseSkill = await prisma.skill.create({
                            data: {
                                name: skillData.name,
                                nqf_level: skillData.nqf_level || null
                            }
                        });
                    }

                    // Link it to the applicant
                    await prisma.applicantSkill.create({
                        data: {
                            applicant_id: updatedApplicantProfile.applicant_id,
                            skill_id: baseSkill.skill_id
                        }
                    });
                }
            }
        }

        // 6. Fetch the completely refreshed profile to send back to the frontend
        const fullyRefreshedUser = await prisma.user.findUnique({
            where: { firebase_uid: firebase_uid },
            include: {
                applicant: {
                    include: {
                        skills: { include: { skill: true } },
                        qualifications: { include: { qualification: true } }
                    }
                }
            }
        });

        // 7. Format the deeply nested Prisma arrays into flat, frontend-friendly arrays
        if (fullyRefreshedUser.applicant) {
            fullyRefreshedUser.applicant.formattedQualifications = fullyRefreshedUser.applicant.qualifications.map(q => ({
                id: q.id, // the unique ID of the applicantQualification joining record
                name: q.qualification.name,
                nqf_level: q.qualification.nqf_level,
                institution: q.institution,
                year_completed: q.year_completed
            }));

            fullyRefreshedUser.applicant.formattedSkills = fullyRefreshedUser.applicant.skills.map(s => ({
                id: s.id, // the unique ID of the applicantSkill joining record
                name: s.skill.name,
                nqf_level: s.skill.nqf_level
            }));

            // Remove the raw Prisma relational data to keep the payload clean
            delete fullyRefreshedUser.applicant.qualifications;
            delete fullyRefreshedUser.applicant.skills;
        }

        // Send it back!
        res.status(200).json(fullyRefreshedUser);

    } catch (error) {
        console.error("CRASH DETAILS during profile update:", error);
        res.status(500).json({
            error: "Internal server error.",
            details: error.message
        });
    }
}

// Register the routes
router.get('/:firebase_uid', getUserProfile);
router.put('/:firebase_uid', updateUserProfile);

module.exports = router;