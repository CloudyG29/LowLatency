const express = require('express');
const router = express.Router();
const prisma = require('../../DB_connect/prisma');

// GET: /api/profile/:firebase_uid
async function getUserProfile(req, res) {
    const { firebase_uid } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { firebase_uid: firebase_uid },
            include: {
                provider: true,
                applicant: {
                    include: {
                        skills: {
                            include: { skill: true }
                        },
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

        const responseData = { ...user };

        if (responseData.applicant) {
            responseData.applicant.formattedQualifications = responseData.applicant.qualifications.map(q => ({
                id: q.id,
                qualification_id: q.qualification.qualification_id,
                name: q.qualification.name,
                degree: q.qualification.name,
                nqf_level: q.qualification.nqf_level,
                nqfLevel: q.qualification.nqf_level,
                sector: q.qualification.sector,
                originator: q.qualification.originator,
                institution: q.institution,
                year_completed: q.year_completed,
                graduationYear: q.year_completed
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

    const {
        name,
        surname,
        phone,
        dob,
        bio,
        qualifications,
        skills
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

                for (let edu of qualifications) {
                    let qualificationId;

                    if (edu.qualification_id) {
                        // User picked from SAQA dropdown — use ID directly
                        qualificationId = edu.qualification_id;
                    } else {
                        // User typed manually — find or create
                        let baseQual = await prisma.qualification.findFirst({
                            where: {
                                name: edu.qualification_name || "Unknown Qualification",
                                nqf_level: edu.nqf_level
                            }
                        });

                        if (!baseQual) {
                            baseQual = await prisma.qualification.create({
                                data: {
                                    name: edu.qualification_name || "Unknown Qualification",
                                    nqf_level: edu.nqf_level
                                }
                            });
                        }

                        qualificationId = baseQual.qualification_id;
                    }

                    // Link it to the applicant
                    await prisma.applicantQualification.create({
                        data: {
                            applicant_id: updatedApplicantProfile.applicant_id,
                            qualification_id: qualificationId,
                            institution: edu.institution,
                            year_completed: edu.year_completed
                        }
                    });
                }
            }

            // --- 5. Handle Skills (Wipe and Replace) ---
            if (skills && Array.isArray(skills)) {

                await prisma.applicantSkill.deleteMany({
                    where: { applicant_id: updatedApplicantProfile.applicant_id }
                });

                for (let skillData of skills) {
                    let baseSkill = await prisma.skill.findFirst({
                        where: { name: skillData.name }
                    });

                    if (!baseSkill) {
                        baseSkill = await prisma.skill.create({
                            data: {
                                name: skillData.name,
                                nqf_level: skillData.nqf_level || null
                            }
                        });
                    }

                    await prisma.applicantSkill.create({
                        data: {
                            applicant_id: updatedApplicantProfile.applicant_id,
                            skill_id: baseSkill.skill_id
                        }
                    });
                }
            }
        }

        // 6. Fetch fully refreshed profile
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

        // 7. Format response
        if (fullyRefreshedUser.applicant) {
            fullyRefreshedUser.applicant.formattedQualifications = fullyRefreshedUser.applicant.qualifications.map(q => ({
                id: q.id,
                qualification_id: q.qualification.qualification_id,
                name: q.qualification.name,
                degree: q.qualification.name,
                nqf_level: q.qualification.nqf_level,
                nqfLevel: q.qualification.nqf_level,
                sector: q.qualification.sector,
                originator: q.qualification.originator,
                institution: q.institution,
                year_completed: q.year_completed,
                graduationYear: q.year_completed
            }));

            fullyRefreshedUser.applicant.formattedSkills = fullyRefreshedUser.applicant.skills.map(s => ({
                id: s.id,
                name: s.skill.name,
                nqf_level: s.skill.nqf_level
            }));

            delete fullyRefreshedUser.applicant.qualifications;
            delete fullyRefreshedUser.applicant.skills;
        }

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
