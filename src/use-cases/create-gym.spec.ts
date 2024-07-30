
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";


describe("Create Gym Use Case", () => {
  let gymsRepository: InMemoryGymRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();

    sut = new CreateGymUseCase(gymsRepository);
  });

  it("Should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "JS gym",
      description: null,
      phone: null,
      latitude: -27.2892852,
      longitude: -49.6481891,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
