-- CreateTable
CREATE TABLE "ProfileAuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "fieldName" TEXT,
    "oldValue" TEXT,
    "newValue" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProfileAuditLog_userId_changedAt_idx" ON "ProfileAuditLog"("userId", "changedAt");

-- CreateIndex
CREATE INDEX "ProfileAuditLog_userId_fieldName_idx" ON "ProfileAuditLog"("userId", "fieldName");

-- AddForeignKey
ALTER TABLE "ProfileAuditLog" ADD CONSTRAINT "ProfileAuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
