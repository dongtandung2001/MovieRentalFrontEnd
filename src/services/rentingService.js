
import httpService from "./httpService";

const apiEndPoint = "/rentals";

export function rent(movie, customer) {
    return httpService.post(apiEndPoint, {
        customerId: customer._id,
        movieId: movie._id,
    });
}
