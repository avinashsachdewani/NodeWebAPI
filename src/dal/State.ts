import { InjectorService, JsonProperty } from 'ts-express-decorators';
import { prop, Typegoose, InstanceType, staticMethod, ModelType } from 'typegoose';
import { StateRepositoryToken } from './token-constants';
export class State extends Typegoose {
    @prop({ unique: true })
    @JsonProperty()
    name: string;
}
export type StateInstance = InstanceType<State>;
export type StateRepository = ModelType<State>;
InjectorService.factory(StateRepositoryToken, new State().getModelForClass(State));