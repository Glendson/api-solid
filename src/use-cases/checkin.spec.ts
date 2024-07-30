import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./checkin";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "./errors/max-distance-error";

describe("Check In Use Case", () => {
  let checkInsRepository: InMemoryCheckInsRepository;
  let gymsRepository: InMemoryGymRepository;
  let sut: CheckInUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      phone: "",
      title: "JS gym",
      description: "",
      latitude: -27.2892852,
      longitude: -49.6481891,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2892852,
      userLongitude: -49.6481891,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 1, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2892852,
      userLongitude: -49.6481891,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -27.2892852,
        userLongitude: -49.6481891,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("Should not be able to check in twice but in the different days", async () => {
    vi.setSystemTime(new Date(2022, 1, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2892852,
      userLongitude: -49.6481891,
    });

    vi.setSystemTime(new Date(2022, 1, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -27.2892852,
      userLongitude: -49.6481891,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JS gym",
      description: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
      phone: "",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
