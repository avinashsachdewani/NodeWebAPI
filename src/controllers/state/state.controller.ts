import { BodyParams, Controller, Get, Post, Put, PathParams, Authenticated, Required, Req, Status } from 'ts-express-decorators';
import { Returns } from 'ts-express-decorators/lib/swagger';
import { IAppRequest } from '../../types/app.types';
import { HTTPStatusCodes } from '../../types/http';
import { Validate, Validator } from 'typescript-param-validator';
// DAL State class injection
import { State } from '../../dal/State';
// State service injection
import { StateService } from '../../services/state/state.service';
// State model
import { StateDto } from './state.dto';
@Controller('/states')
// @Authenticated()
export class StateController {
    constructor(
        private stateService: StateService
    ) {

    }
    @Get('/:id([0-9a-f]{24})')
    @Returns(State)
    async getStateById(@Required() @PathParams('id') id: string): Promise<State> {
        return await this.stateService.getStateById(id);
    }
    @Get('/:name')
    async getState(@Required() @PathParams('name') name: string): Promise<State> {

        return await this.stateService.getStateByName(name);
    }
    @Post('/')
    @Returns(State)
    @Status(HTTPStatusCodes.CREATED)
    @Validate()
    async insertState(
        @Validator() @BodyParams() data: StateDto
    ) {
        const state = await this.stateService.insertState(data);
        return state;
    }
    @Put('/')
    @Returns(State)
    @Status(HTTPStatusCodes.ACCEPTED)
    @Validate()
    async updateState(
        @Validator() @BodyParams() data: StateDto
    ) {
        const state = await this.stateService.updateState(data);
        return state;
    }

}