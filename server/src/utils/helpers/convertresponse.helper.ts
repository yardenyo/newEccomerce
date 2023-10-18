import PostBody from '@/utils/interfaces/postbody.interface';

export default async (body: PostBody) => {
    const {
        page = 1,
        resultsPerPage = 25,
        sortBy,
        sortOrder = 1,
        searchKey,
        searchValue,
    } = body;

    const sort = sortOrder === 1 ? sortBy : `-${sortBy}`;
    const skip = (page - 1) * resultsPerPage;
    const limit = resultsPerPage;

    let searchFilter = {};

    if (searchKey && searchValue) {
        searchFilter = {
            [searchKey]: searchValue,
        };
    }

    return {
        sort,
        skip,
        limit,
        searchFilter,
    };
};
