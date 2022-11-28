import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

async function findHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function findHotelRooms(hotelId: number) {
  return prisma.hotel.findFirst( {
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const ticketRepository = {
  findHotels,
  findHotelRooms

};

export default ticketRepository;
