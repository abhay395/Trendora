const paginate = (schema) => {
    schema.statics.paginate = async function (filter, options) {
        let sort = '';
        if (options.sortBy) {
            const sortingCriteria = [];
            options.sortBy.split(',').forEach((sortOption) => {
                const [key, order] = sortOption.split(':');
                sortingCriteria.push((order === 'desc' ? '-' : '') + key);
            });
            sort = sortingCriteria.join(' ');
        } else {
            sort = '-createdAt';
        };

        const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 0;  //This code start paging from 0
        const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 0;
        const skip = page ? (page) * limit : 0;

        // const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;   //This code start paging from 1
        // const skip = (page - 1) * limit;

        const countPromise = this.countDocuments(filter).exec();
        let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

        if (options.populate) {
            const populateOptions = options.populate.split(',');

            const buildPopulateTree = (paths) => {
                const tree = {};
                paths.forEach((path) => {
                    const levels = path.split('.');
                    let current = tree;

                    for (let i = 0; i < levels.length; i++) {
                        const level = levels[i];
                        if (!current[level]) {
                            current[level] = {};
                        }
                        current = current[level];
                    }
                });

                const buildPopulateObject = (obj) => {
                    return Object.entries(obj).map(([path, children]) => {
                        const hasChildren = Object.keys(children).length > 0;
                        return {
                            path,
                            ...(hasChildren && { populate: buildPopulateObject(children) }),
                        };
                    });
                };

                return buildPopulateObject(tree);
            };

            const populateTree = buildPopulateTree(populateOptions);
            populateTree.forEach((populateObj) => {
                docsPromise = docsPromise.populate(populateObj);
            });
        }

        docsPromise = docsPromise.exec();

        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values;
            const totalPages = limit > 0 ? Math.ceil(totalResults / limit) : 0;
            const result = {
                results,
                page,
                limit,
                totalPages,
                totalResults,
            };
            return Promise.resolve(result);
        });
    };
};

export { paginate };
