export default interface SubscriptionPlanModel {
  id: number;
  name: string;
  price: number;
  pricePerYear: number;
  deviceLimt: number;
  yearlyDiscountPrecentage: number;
  yearlyPriceBeforeDiscount:number;
  yearlyPriceAfterDiscount:number;
  durationType: number;
  features: string[];
}
export default interface AddSubscribeToPlanParams {
  companyId: string;
  subscriptionPlanId: number;
  subscriptionDuration: number;
}
export default interface AddSubscriptionPlanModel {

  success: boolean,
  status: number,
  message: string;

}
