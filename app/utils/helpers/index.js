export const listToTree2 = (data, options) => {
    console.log(data)
    options = options || {}
    const ID_KEY = options.idKey || 'id'
    const PARENT_KEY = options.parentKey || 'parent'
    const CHILDREN_KEY = options.childrenKey || 'children'

    const tree = []
    const childrenOf = {}
    let item, id, parentId

    for (let i = 0, length = data.length; i < length; i++) {
        item = data[i]
        id = item[ID_KEY]
        parentId = item[PARENT_KEY].id || 0
        // every item may have children
        childrenOf[id] = childrenOf[id] || []
        // init its children
        item[CHILDREN_KEY] = childrenOf[id]
        if (parentId !== 1) {
            // init its parent's children object
            childrenOf[parentId] = childrenOf[parentId] || []
            // push it into its parent's children object
            childrenOf[parentId].push(item)
        } else {
            tree.push(item)
        }
    }

    return tree
}

export const listToTree = (nodes) => {
    const topLevelNodes = []
    const mappedArr = {}

    // First map the nodes of the array to an object -> create a hash table.
    for (const node of nodes) {
        mappedArr[node.id] = { ...node, children: [] }
    }

    for (const id of nodes.map((n) => n.id)) {
        // eslint-disable-next-line no-prototype-builtins
        if (mappedArr.hasOwnProperty(id)) {
            const mappedElem = mappedArr[id]
            const parent = mappedElem.parent
            if (!parent) {
                return
            }
            // If the element is not at the root level, add it to its parent array of children.
            const parentIsRoot = !mappedArr[parent.id]
            if (!parentIsRoot) {
                if (mappedArr[parent.id]) {
                    mappedArr[parent.id].children.push(mappedElem)
                } else {
                    mappedArr[parent.id] = { children: [mappedElem] }
                }
            } else {
                topLevelNodes.push(mappedElem)
            }
        }
    }
    // tslint:disable-next-line:no-non-null-assertion
    return [...topLevelNodes]
}

export const formatURLImage = (image) => image.replace(/[\\]+/g, '/')

export const formatFacetValues = (facetValues) => {
    const facets = []

    for (let index = 1; index < facetValues.length; index++) {
        const element = facetValues[index]
        if (!facets.some((el) => el.name === element.facetValue.facet.name)) {
            facets.push({ name: element.facetValue.facet.name, values: [] })
        }
        for (const facet of facets) {
            if (facet.name === element.facetValue.facet.name) {
                facet.values.push(element)
            }
        }
    }
    return facets
}
const facetSelectedFormated = (facetValues, facetSelected) => {
    let result
    facetValues.forEach(({ values }) => {
        values.forEach(({ facetValue }) => {
            if (facetValue.id === facetSelected) {
                result = facetValue.name
            }
        })
    })
    return { key: facetSelected, label: result }
}

export const mappedFacetsSelected = (facetValues, facetsSelected) => {
    return facetsSelected.map((facet) =>
        facetSelectedFormated(facetValues, facet)
    )
}

export const toThousand = (n) =>
    n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
