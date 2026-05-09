export default {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "sqlserver://lowlatency2.database.windows.net:1433;database=SkillBridge;user=CloudSAca3dae46;password=LowLatency5;encrypt=true;trustServerCertificate=true",
  },
};