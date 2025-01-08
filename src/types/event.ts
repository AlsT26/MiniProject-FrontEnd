export interface IPromotor {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface IEvent {
  promotorId: number;
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  location: string;
  venue: string;
  dateTime: string;
  thumbnail: string;
  promotor: IPromotor;
}
export interface ITicket{
  id          :string
  title       :String
  desc        :String
  price       :number 
  available   :number
  totalSeats  :number

  eventId  :number
}
