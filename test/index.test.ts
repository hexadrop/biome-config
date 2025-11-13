import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { cp, mkdtemp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import temporaryDirectory from "temp-dir";

const fixtures = path.join(process.cwd(), "fixtures");
const fixturesFiles = await readdir(fixtures);

describe("@hexadrop/biome-config", () => {
	let temporary: string;

	beforeAll(async () => {
		temporary = await mkdtemp(path.join(temporaryDirectory, "fixtures"));
		await cp(fixtures, temporary, {
			recursive: true,
		});
	});

	test.each(fixturesFiles)("biome check %s", async (file) => {
		const temporaryFile = path.join(temporary, file);
		console.log("temporary file", temporaryFile);
		const subprocess = Bun.spawn(
			[
				"bun",
				"biome",
				"check",
				"--write",
				temporaryFile,
			],
			{
				cwd: process.cwd(),
			},
		);

		const result = await subprocess.exited;

		expect(result).toBe(0);

		const temporaryFileContent = await Bun.file(temporaryFile).text();

		expect(temporaryFileContent).toMatchSnapshot();
	});

	afterAll(async () => {
		if (temporary) {
			await rm(temporary, {
				force: true,
				recursive: true,
			});
		}
	});
});
