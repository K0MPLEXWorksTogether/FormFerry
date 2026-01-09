export interface PlanInterface {
  createPlan(data: object): Promise<object>;
  updatePlan(data: object, id: string): Promise<object>;
  deletePlan(id: string): Promise<object>;
  getPlanById(id: string): Promise<object>;
  getPlans(page: number, limit: number): Promise<object[]>;
}
