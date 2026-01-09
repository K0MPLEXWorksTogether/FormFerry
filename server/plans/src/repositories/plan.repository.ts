import { PlanInterface } from "../interfaces/plan.interface";
import { db } from "../utils/drizzle";
import { plans } from "../models/Plan";
import { AppLogger } from "../utils/logger";
import {
  createPlanValidator,
  updatePlanValidator,
} from "../validators/plan.validator";
import { ValidationError, InvalidError } from "../types/errors";
import { eq } from "drizzle-orm";

export class PlanRepository implements PlanInterface {
  private logger = AppLogger.getInstance();
  private handleError(err: any): never {
    if (err instanceof ValidationError || err instanceof InvalidError) {
      throw err;
    } else {
      this.logger.error(`[repository] Undocumented Error: ${err.message}`);
      throw err;
    }
  }

  async createPlan(data: object): Promise<object> {
    try {
      const result = createPlanValidator.safeParse(data);
      if (!result.success) {
        this.logger.error(
          `[repository] Data does not match the expected format.`
        );
        throw new ValidationError("Invalid Data Format");
      }
      const parsedData = result.data;

      const existingPlan = await db
        .select()
        .from(plans)
        .where(eq(plans.name, parsedData.name));
      if (existingPlan.length > 0) {
        this.logger.error(
          `[repository] A plan with the name ${parsedData.name} already exists.`
        );
        throw new InvalidError("Plan Already Exists");
      }

      // TODO: Log The id of the newly inserted plan
      const newPlan = await db.insert(plans).values(parsedData).returning();
      this.logger.info(`[repository] Plan created successfully!`);
      return newPlan;
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async updatePlan(data: object, id: string): Promise<object> {
    try {
      if (!id) {
        this.logger.error(`[repository] Id was not passed.`);
        throw new ValidationError("Invalid Data Format");
      }

      const result = updatePlanValidator.safeParse(data);
      if (!result.success) {
        this.logger.error(
          `[repository] Data does not match the expected format.`
        );
        throw new ValidationError("Invalid Parameters");
      }
      const parsedData = result.data;

      const updatedPlan = await db
        .update(plans)
        .set(parsedData)
        .where(eq(plans.id, id))
        .returning();
      this.logger.info(
        `[repository] Task with id: ${id} updated successfully!`
      );
      return updatedPlan;
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async deletePlan(id: string): Promise<object> {
    try {
      if (!id) {
        this.logger.error(`[repository] Id was not passed.`);
        throw new ValidationError("Invalid Parameters");
      }

      const deletedPlan = await db
        .delete(plans)
        .where(eq(plans.id, id))
        .returning();
      this.logger.info(
        `[repository] Plan with ID: ${id} was deleted successfully!`
      );
      return deletedPlan;
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async getPlanById(id: string): Promise<object> {
    try {
      if (!id) {
        this.logger.error(`[repository] Id was not passed.`);
        throw new ValidationError("Invalid Parameters");
      }

      const plan = await db.select().from(plans).where(eq(plans.id, id));
      this.logger.info(
        `[repository] Plan with ID: ${id} was retrieved successfully!`
      );
      return plan;
    } catch (err: any) {
      this.handleError(err);
    }
  }

  async getPlans(page: number, limit: number): Promise<object[]> {
    try {
      if (!page || !limit || page <= 0 || limit <= 0) {
        this.logger.error(`[repository] Id was not passed.`);
        throw new ValidationError("Invalid Parameters");
      }

      const skip = (page - 1) * limit;
      const retrievedPlans = await db
        .select()
        .from(plans)
        .offset(skip)
        .limit(limit);
      this.logger.info(
        `[repository] Plans with page: ${page}, limit: ${limit} retrived successfully!`
      );
      return retrievedPlans;
    } catch (err) {
      this.handleError(err);
    }
  }
}
