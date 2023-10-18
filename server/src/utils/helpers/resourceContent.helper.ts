function capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export const controllerContent = (resourceName: string) => `
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.validation';
import ${capitalizeFirstLetter(
    resourceName,
)}Service from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.service';
import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class ${capitalizeFirstLetter(resourceName)}Controller implements Controller {
    public path = '/${resourceName.toLowerCase()}s';
    public router = Router();
    private ${resourceName}Service = new ${capitalizeFirstLetter(
        resourceName,
    )}Service();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            \`\${this.path}/create\`,
            validationMiddleware(validate.create${capitalizeFirstLetter(
                resourceName,
            )}),
            authMiddleware,
            creatorMiddleware,
            this.create${capitalizeFirstLetter(resourceName)},
        );
        this.router.post(\`\${this.path}\`, authMiddleware, this.getAll${capitalizeFirstLetter(
            resourceName,
        )}s);
        this.router.get(
            \`\${this.path}/:id\`,
            authMiddleware,
            this.get${capitalizeFirstLetter(resourceName)}ById,
        );
        this.router.put(
            \`\${this.path}/:id\`,
            validationMiddleware(validate.update${capitalizeFirstLetter(
                resourceName,
            )}),
            authMiddleware,
            creatorMiddleware,
            this.update${capitalizeFirstLetter(resourceName)},
        );
        this.router.delete(
            \`\${this.path}/:id\`,
            authMiddleware,
            creatorMiddleware,
            this.delete${capitalizeFirstLetter(resourceName)},
        );
        this.router.delete(
            \`\${this.path}\`,
            authMiddleware,
            creatorMiddleware,
            this.deleteAll${capitalizeFirstLetter(resourceName)}s,
        );
    }

    private create${capitalizeFirstLetter(resourceName)} = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const ${resourceName} = await this.${resourceName}Service.create${capitalizeFirstLetter(
                resourceName,
            )}(req.body);
            res.json(new SuccessResponse('${capitalizeFirstLetter(
                resourceName,
            )} created', ${resourceName}));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAll${capitalizeFirstLetter(resourceName)}s = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const ${resourceName}s = await this.${resourceName}Service.getAll${capitalizeFirstLetter(
                resourceName,
            )}s(req.body);
            res.json(new SuccessResponse('${capitalizeFirstLetter(
                resourceName,
            )}s retrieved', ${resourceName}s));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private get${capitalizeFirstLetter(resourceName)}ById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);
            const ${resourceName} = await this.${resourceName}Service.get${capitalizeFirstLetter(
                resourceName,
            )}ById(id);
            res.json(new SuccessResponse('${capitalizeFirstLetter(
                resourceName,
            )} retrieved', ${resourceName}));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private update${capitalizeFirstLetter(resourceName)} = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);

            const ${resourceName} = await this.${resourceName}Service.update${capitalizeFirstLetter(
                resourceName,
            )}(id, req.body);
            res.json(new SuccessResponse('${capitalizeFirstLetter(
                resourceName,
            )} updated', ${resourceName}));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private delete${capitalizeFirstLetter(resourceName)} = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);
            await this.${resourceName}Service.delete${capitalizeFirstLetter(
                resourceName,
            )}ById(id);
            res.json(new SuccessResponse('${capitalizeFirstLetter(
                resourceName,
            )} deleted'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAll${capitalizeFirstLetter(resourceName)}s = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.${resourceName}Service.deleteAll${capitalizeFirstLetter(
                resourceName,
            )}s();
            res.json(new SuccessResponse('${capitalizeFirstLetter(
                resourceName,
            )}s deleted'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ${capitalizeFirstLetter(resourceName)}Controller;
`;

export const interfaceContent = (resourceName: string) => `
import { Document } from 'mongoose';

export default interface ${capitalizeFirstLetter(
    resourceName,
)} extends Document {
}
`;

export const modelContent = (resourceName: string) => `
import { Schema, model } from 'mongoose';
import ${capitalizeFirstLetter(
    resourceName,
)} from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.interface';

const ${capitalizeFirstLetter(resourceName)}Schema = new Schema(
    {
    },
    { timestamps: true },
);

const ${capitalizeFirstLetter(
    resourceName,
)}Model = model<${capitalizeFirstLetter(resourceName)}>(
    '${capitalizeFirstLetter(resourceName)}',
    ${capitalizeFirstLetter(resourceName)}Schema,
);

export default ${capitalizeFirstLetter(resourceName)}Model;
`;

export const serviceContent = (resourceName: string) => `
import ${capitalizeFirstLetter(
    resourceName,
)} from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.interface';
import ${capitalizeFirstLetter(
    resourceName,
)}Model from '@/resources/${resourceName.toLowerCase()}/${resourceName.toLowerCase()}.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class ${capitalizeFirstLetter(resourceName)}Service {
    private ${resourceName} = ${capitalizeFirstLetter(resourceName)}Model;

    public async create${capitalizeFirstLetter(
        resourceName,
    )}(body: ${capitalizeFirstLetter(
        resourceName,
    )}): Promise<${capitalizeFirstLetter(resourceName)}> {
        try {
            const ${resourceName} = await this.${resourceName}.create({
                ...body,
                slug: slugify(body.title, { lower: true }),
            });
            return ${resourceName};
        } catch (error) {
            throw new Error('Error creating ${resourceName}');
        }
    }

    public async getAll${capitalizeFirstLetter(
        resourceName,
    )}s(body: PostBody): Promise<${capitalizeFirstLetter(resourceName)}[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const ${resourceName}s = await this.${resourceName}
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return ${resourceName}s;
        } catch (error) {
            throw new Error('Error retrieving ${resourceName}s');
        }
    }

    public async get${capitalizeFirstLetter(
        resourceName,
    )}ById(id: string): Promise<${capitalizeFirstLetter(resourceName)}> {
        try {
            const ${resourceName} = await this.${resourceName}.findById(id);
            if (!${resourceName}) throw new Error();
            return ${resourceName};
        } catch (error) {
            throw new Error('Error retrieving ${resourceName}');
        }
    }

    public async update${capitalizeFirstLetter(
        resourceName,
    )}(id: string, body: ${capitalizeFirstLetter(
        resourceName,
    )}): Promise<${capitalizeFirstLetter(resourceName)}> {
        try {
            const new${capitalizeFirstLetter(
                resourceName,
            )} = await this.${resourceName}.findByIdAndUpdate(id, body, {
                new: true,
            });
            if (!new${capitalizeFirstLetter(resourceName)}) throw new Error();
            return new${capitalizeFirstLetter(resourceName)};
        } catch (error) {
            throw new Error('Error updating ${resourceName}');
        }
    }

    public async delete${capitalizeFirstLetter(
        resourceName,
    )}ById(id: string): Promise<void> {
        try {
            await this.${resourceName}.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting ${resourceName}');
        }
    }

    public async deleteAll${capitalizeFirstLetter(
        resourceName,
    )}s(): Promise<void> {
        try {
            await this.${resourceName}.deleteMany();
        } catch (error) {
            throw new Error('Error deleting ${resourceName}s');
        }
    }
}

export default ${capitalizeFirstLetter(resourceName)}Service;
`;

export const validationContent = (resourceName: string) => `
import Joi from 'joi';

const create${capitalizeFirstLetter(resourceName)} = Joi.object({
});

const update${capitalizeFirstLetter(resourceName)} = Joi.object({
});

export default { create${capitalizeFirstLetter(
    resourceName,
)}, update${capitalizeFirstLetter(resourceName)} };
`;
