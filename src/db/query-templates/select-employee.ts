import { Employee, Sort } from '../types';

export interface SelectEmployeeArgs {
    fields?: (keyof Employee)[];
    sort?: Sort<Employee>;
    where: {
        _id?: string;
        FirstName?: string;
        LastName?: string;
        IsRemoved?: boolean;
        IsLocked?: boolean;
    };
}

export interface SelectParts {
    command: string;
    fields: (keyof Employee)[];
    source: string;
    conditions: string[];
}

export const selectEmployee = (args: SelectEmployeeArgs) => {
    const { where, fields, sort } = args;

    const selectParts: SelectParts = {
        command: "SELECT",
        fields: [],
        source: "Employee",
        conditions: [],
    };

    if (fields && fields.length > 0) {
        selectParts.fields = selectParts.fields.concat(fields);
    } else {
        selectParts.fields.push("*" as keyof Employee);
    }

    for (let field in where) {
        selectParts.conditions.push(
            `${field} = '${String(where[field as keyof typeof where])}'`
        );
    }

    let queryString = `${selectParts.command} ${selectParts.fields.join(
        ", "
    )} FROM ${selectParts.source}`;

    if (selectParts.conditions.length > 0) {
        queryString += ` WHERE ${selectParts.conditions.join(" AND ")}`;
    }

    if (sort) {
        queryString += ` ORDER BY ${sort.field} ${sort.direction}`;
    }

    return queryString;
};
