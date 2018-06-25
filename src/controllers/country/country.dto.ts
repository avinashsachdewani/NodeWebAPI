import { IsEmail, IsNotEmpty as Required, IsOptional, IsUrl, MinLength } from 'class-validator';
import { JsonProperty } from 'ts-express-decorators';

export class CountryDto {
    @Required()
    @JsonProperty()
    name: string;

}