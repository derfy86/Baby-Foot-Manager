BEGIN;

DROP TABLE IF EXISTS "play";

--
-- status = true -- if the play is finish
-- 

CREATE TABLE "play" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "status" BOOLEAN NOT NULL DEFAULT FALSE,
    "score_A" INTEGER,
    "score_B" INTEGER,
    "team_A" VARCHAR(255) NOT NULL,
    "team_B" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP
);

COMMIT;