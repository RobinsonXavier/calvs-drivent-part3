import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const result = await hotelsService.listAllHotels(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.statusText === "UNAUTHORIZED") return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const userId = req.userId;

  if (!hotelId) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }

  try {
    const result = await hotelsService.findHotel(userId, Number(hotelId));
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.statusText === "UNAUTHORIZED") return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
