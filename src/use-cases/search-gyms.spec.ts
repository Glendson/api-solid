import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

describe("Search gyms Use Case", () => {
  let gymsRepository: InMemoryGymRepository;
  let sut: SearchGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript GYM",
      description: null,
      phone: null,
      latitude: -27.2892852,
      longitude: -49.6481891,
    });

    await gymsRepository.create({
      title: "TypeScript GYM",
      description: null,
      phone: null,
      latitude: -27.2892852,
      longitude: -49.6481891,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      await expect.objectContaining({ title: "JavaScript GYM" }),
    ]);
  });

  it("Should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript GYM ${i}`,
        description: null,
        phone: null,
        latitude: -27.2892852,
        longitude: -49.6481891,
      });
    }

    const { gyms } = await sut.execute({
        query: 'TypeScript',
        page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      await expect.objectContaining({ title: "TypeScript GYM 21" }),
      await expect.objectContaining({ title: "TypeScript GYM 22" }),
    ]);
  });
});
