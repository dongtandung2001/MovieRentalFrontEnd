import httpService from "./httpService";
import { setCustomer } from "./userService";
import _ from 'lodash'

const apiEndPoint = "/customers";

export async function save(customer) {
    if (!customer._id) {

        const { data } = await httpService.post(apiEndPoint, {
            name: customer.name,
            phone: customer.phone,
            SSN: customer.SSN,
        })
        await setCustomer(data);
        return 'created';


    } else {
        return await httpService.put(apiEndPoint + `/${customer._id}`, _.pick(customer, ['name', 'SSN', 'phone']))
    }

}

export async function getCustomer(id) {
    return await httpService.get(apiEndPoint + `/${id}`);
}