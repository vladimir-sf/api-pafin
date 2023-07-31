import { Model } from "objection";
import Knex from "knex";
import knexConfig from "./knexfile";
// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance.
Model.knex(knex);
