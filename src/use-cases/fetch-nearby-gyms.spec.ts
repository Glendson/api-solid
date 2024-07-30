import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

describe("Fetch Nearby Gyms Use Case", () => {
  let gymsRepository: InMemoryGymRepository;
  let sut: FetchNearbyGymsUseCase;

  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("Should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near GYM",
      description: null,
      phone: null,
      latitude: -27.2892852,
      longitude: -49.6481891,
    });

    await gymsRepository.create({
      title: "Far GYM",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2892852,
      userLongitude: -49.6481891,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      await expect.objectContaining({ title: "Near GYM" }),
    ]);
  });
});
