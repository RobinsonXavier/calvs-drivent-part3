import { notFoundError, requestError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listAllHotels(userId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!checkEnrollment) {
    throw notFoundError();
  }

  const checkTicket = await ticketRepository.findTicketByEnrollmentId(checkEnrollment.id);

  if (!checkTicket) {
    throw notFoundError();
  }

  if (checkTicket.status === "RESERVED") {
    throw requestError(401, "UNAUTHORIZED");
  }

  const checkTicketType = await ticketRepository.findTickeWithTypeById(checkTicket.id);

  if (checkTicketType.TicketType.isRemote === true ) {
    throw requestError(401, "UNAUTHORIZED");
  }

  if (checkTicketType.TicketType.includesHotel === false) {
    throw requestError(401, "UNAUTHORIZED");
  }

  const hotelsList = await hotelsRepository.findHotels();

  return hotelsList;
}

async function findHotel(userId: number, hotelId: number) {
  const checkEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!checkEnrollment) {
    throw notFoundError();
  }

  const checkTicket = await ticketRepository.findTicketByEnrollmentId(checkEnrollment.id);

  if (!checkTicket) {
    throw notFoundError();
  }

  if (checkTicket.status === "RESERVED") {
    throw requestError(401, "UNAUTHORIZED");
  }

  const checkTicketType = await ticketRepository.findTickeWithTypeById(checkTicket.id);

  if (checkTicketType.TicketType.isRemote === true || checkTicketType.TicketType.includesHotel === false) {
    throw requestError(401, "UNAUTHORIZED");
  }

  const hotelRooms = await hotelsRepository.findHotelRooms(hotelId);

  if(!hotelRooms) {
    throw notFoundError();
  }
  console.log(hotelRooms);

  return hotelRooms;
}
 
const hotelsService = {
  listAllHotels,
  findHotel
};

export default hotelsService;
