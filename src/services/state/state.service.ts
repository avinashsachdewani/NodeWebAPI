import { Inject, Service } from 'ts-express-decorators';
import { API_ERRORS } from '../../types/app.errors';
import { MongoErrorCode } from '../../types/mongo';
import { ApiError } from '../../utils/error';
import { UnexpectedError } from '../../utils/error/UnexpectedError';
// States entity related injection
import { StateRepositoryToken } from '../../dal/token-constants';
import { State, StateRepository } from '../../dal/State';
import { IStateDto } from './state.dto';
@Service()
export class StateService {
    constructor(
        @Inject(StateRepositoryToken) private stateRepository: StateRepository
    ) {

    }

    async insertState(stateModel: IStateDto): Promise<State> {
        this.validateState(stateModel);

        const state = new this.stateRepository({
            ...stateModel
        });

        try {
            return await state.save();
        } catch (e) {
            if (e.code === MongoErrorCode.DUPLICATE_KEY) {
                throw new ApiError(API_ERRORS.RECORD_ALREADY_EXISTS);
            }

            throw new UnexpectedError();
        }
    }
    async getStateByName(name: string) {
        return await this.stateRepository.findOne({ name });
    }
    async getStateById(id: string) {
        return await this.stateRepository.findById(id, 'name');
    }
    async updateState(stateModel: IStateDto): Promise<State> {
        this.validateState(stateModel);
        try {
            return await this.stateRepository.findOneAndUpdate(stateModel.name, stateModel);
        } catch (e) {
            if (e.code === MongoErrorCode.DUPLICATE_KEY) {
                throw new ApiError(API_ERRORS.RECORD_ALREADY_EXISTS);
            }

            throw new UnexpectedError();
        }
    }
    private validateState(state: IStateDto) {
        if (!state.name) throw new ApiError('Missing state field', 400);
    }



}