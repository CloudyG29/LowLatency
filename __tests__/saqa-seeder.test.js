/**
 * @jest-environment node
 */

// 1. Mock the dependencies before they are ever required by the script
jest.mock('dotenv', () => ({
    config: jest.fn(),
  }));
  
  jest.mock('../backend/services/saqa.service', () => ({
    fetchAllQualifications: jest.fn(),
    fetchAllUnitStandards: jest.fn(),
  }));
  
  jest.mock('../DB_connect/prisma', () => ({
    qualification: { upsert: jest.fn() },
    skill: { upsert: jest.fn() },
    $disconnect: jest.fn(),
  }));
  
  const saqaService = require('../backend/services/saqa.service');
  const prisma = require('../DB_connect/prisma');
  
  describe('SAQA Database Seeding Script', () => {
    let consoleLogSpy, consoleErrorSpy, processExitSpy;
  
    beforeEach(() => {
      jest.clearAllMocks();
      
      // Spy on consoles to keep our test terminal output completely clean
      consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // CRITICAL: Mock process.exit so the script doesn't crash the Jest runner on failure
      processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    });
  
    afterEach(() => {
      consoleLogSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      processExitSpy.mockRestore();
    });
  
    test('should scrape and seed qualifications and skills successfully', async () => {
      // 1. Setup mock returning data
      const mockQuals = [{ saqa_id: 101, name: 'BSc IT' }];
      const mockSkills = [{ saqa_id: 202, name: 'Write Code' }];
  
      saqaService.fetchAllQualifications.mockResolvedValue(mockQuals);
      saqaService.fetchAllUnitStandards.mockResolvedValue(mockSkills);
      
      prisma.qualification.upsert.mockResolvedValue();
      prisma.skill.upsert.mockResolvedValue();
      prisma.$disconnect.mockResolvedValue();
  
      // 2. Require the script in an isolated module so it executes 'main()' immediately
      jest.isolateModules(() => {
        require('../backend/scripts/seed-qualifications.js');
      });
  
      // 3. Wait a split second for the background async Promises to finish executing
      await new Promise(resolve => setTimeout(resolve, 50));
  
      // 4. Run our assertions
      expect(saqaService.fetchAllQualifications).toHaveBeenCalledWith(0);
      expect(saqaService.fetchAllUnitStandards).toHaveBeenCalled();
  
      expect(prisma.qualification.upsert).toHaveBeenCalledWith({
        where: { saqa_id: 101 },
        update: mockQuals[0],
        create: mockQuals[0],
      });
  
      expect(prisma.skill.upsert).toHaveBeenCalledWith({
        where: { saqa_id: 202 },
        update: mockSkills[0],
        create: mockSkills[0],
      });
  
      expect(prisma.$disconnect).toHaveBeenCalled();
      expect(processExitSpy).not.toHaveBeenCalled();
    });
  
    test('should catch errors, log them, and exit the process with code 1', async () => {
      // 1. Force the scraping function to throw an error
      const fakeError = new Error('SAQA API is down');
      saqaService.fetchAllQualifications.mockRejectedValue(fakeError);
  
      // 2. Execute script
      jest.isolateModules(() => {
        require('../backend/scripts/seed-qualifications.js'); // ⚠️ UPDATE THIS PATH TO YOUR ACTUAL FILE
      });
  
      // 3. Wait for the error block to resolve
      await new Promise(resolve => setTimeout(resolve, 50));
  
      // 4. Assert that it hit the `.catch()` block correctly
      expect(consoleErrorSpy).toHaveBeenCalledWith(fakeError);
      expect(processExitSpy).toHaveBeenCalledWith(1);
      
      // Prove that it crashed before it reached the database disconnect phase
      expect(prisma.$disconnect).not.toHaveBeenCalled(); 
    });
  });