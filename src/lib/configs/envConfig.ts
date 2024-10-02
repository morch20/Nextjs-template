import { loadEnvConfig } from "@next/env";

// * https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#loading-environment-variables-with-nextenv
const projectDir = process.cwd();
loadEnvConfig(projectDir);
