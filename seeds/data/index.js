const scopes = require('../../app/constants/scopes');

exports.users = [
    {id: '4f9631ca-e1ba-4ef7-ab48-d36c066c8a3c', firstName: 'Dave', lastName: 'Jones', email: 'Dave.Jones@abc.com'},
    {id: '38b86564-340f-499b-95d2-6a878c61661c', firstName: 'Pavan', lastName: 'Patel', email: 'Pavan.Patel@abc.com'},
    {id: '71aca516-d96f-4e10-912e-2afc9d43f94e', firstName: 'Les', lastName: 'Nygaard', email: 'Les.Nygaard@abc.com'},
    {id: '2507595c-3ad6-47ea-a5af-ad12e0825ec8', firstName: 'Sandy', lastName: 'Shore', email: 'Sandy.Shore@def.com'},
    {id: '1ceb2396-b47e-40ed-8dea-5b083c7f2a4b', firstName: 'Dusty', lastName: 'Rhodes', email: 'Dusty.Rhodes@def.com'},
    {id: '850897a7-2f1a-4ad7-b52e-55ee5e6b96d3', firstName: 'River', lastName: 'Banks', email: 'River.Banks@def.com'}
];

exports.orgs = [
    {id: '148ac505-7144-4b33-87ce-4cf8bccb8861', name: 'ABC Kitchen Co.', settings: {theme: 'light'}},
    {id: '8afef779-c71b-44c2-a7d1-a89f42f5d500', name: 'DEF Toys Inc.', settings: {theme: 'midnight'}},
    {id: 'bfb79125-ac53-4f98-a13a-a3a9628d9011', name: 'Forbidden Fruits LLC', settings: {}} // no members
];

exports.user_orgs = [
    {userId: exports.users[0].id, orgId: exports.orgs[0].id},
    {userId: exports.users[0].id, orgId: exports.orgs[1].id},
    {userId: exports.users[1].id, orgId: exports.orgs[0].id},
    {userId: exports.users[1].id, orgId: exports.orgs[1].id},
    {userId: exports.users[2].id, orgId: exports.orgs[0].id},
    {userId: exports.users[3].id, orgId: exports.orgs[0].id},
    {userId: exports.users[4].id, orgId: exports.orgs[0].id},
    {userId: exports.users[5].id, orgId: exports.orgs[0].id}
];

exports.roles = [
    {id: 'fa1cdf26-34b1-4831-8a7e-f3cf0f70c709', orgId: exports.orgs[0].id, name: 'Admin', scopes: JSON.stringify([scopes.ADMIN])},
    {id: '48b4c39a-944d-42de-805a-e3cb59c6b0e8', orgId: exports.orgs[0].id, name: 'Manager', scopes: JSON.stringify([scopes.CREATE_PRODUCT, scopes.EDIT_PRODUCT, scopes.READ_PRODUCT, scopes.DELETE_PRODUCT])},
    {id: '086f12e9-d5e1-4405-9c41-2dfb51e8e9aa', orgId: exports.orgs[0].id, name: 'Staff member', scopes: JSON.stringify([scopes.EDIT_PRODUCT, scopes.READ_PRODUCT])},
    {id: 'f9a0ab94-40da-49d9-bca9-45ff4f8f1520', orgId: exports.orgs[1].id, name: 'Administrator', scopes: JSON.stringify([scopes.ADMIN])},
    {id: '9570acf8-a58a-4476-a57b-cd50b4e14244', orgId: exports.orgs[1].id, name: 'Supervisor', scopes: JSON.stringify([scopes.CREATE_PRODUCT, scopes.EDIT_PRODUCT, scopes.READ_PRODUCT, scopes.DELETE_PRODUCT])},
    {id: '6b550b2f-c122-42d9-94d7-88ebcdc9a694', orgId: exports.orgs[1].id, name: 'Associate', scopes: JSON.stringify([scopes.EDIT_PRODUCT, scopes.READ_PRODUCT])},
    {id: '5c880500-651e-4acb-9fbe-62a0254b507d', orgId: exports.orgs[1].id, name: 'Analyst', scopes: JSON.stringify([scopes.READ_PRODUCT])}
];

exports.user_roles = [
    {userId: exports.users[0].id, roleId: exports.roles[0].id},
    {userId: exports.users[0].id, roleId: exports.roles[6].id},
    {userId: exports.users[1].id, roleId: exports.roles[1].id},
    {userId: exports.users[1].id, roleId: exports.roles[3].id},
    {userId: exports.users[2].id, roleId: exports.roles[2].id},
    {userId: exports.users[3].id, roleId: exports.roles[3].id},
    {userId: exports.users[4].id, roleId: exports.roles[4].id},
    {userId: exports.users[5].id, roleId: exports.roles[5].id}
];

exports.products = [
    {id: 'ce561ecc-c499-4f26-8185-9dee6da681bd', name: 'plates, dinner', orgId: exports.orgs[0].id, description: 'ceramic, 12 in.', cost: 42.50},
    {id: '2d31b9c9-90b7-48c0-99d8-b797d88aa314', name: 'plates, dessert', orgId: exports.orgs[0].id, description: 'ceramic, 5.5 in.', cost: 29.75},
    {id: '84305ba6-27db-4a53-9bec-d9b52464ee43', name: 'forks', orgId: exports.orgs[0].id, description: 'stainless steel, set of 6', cost: 17.99},
    {id: 'a2fb0399-61a1-4e87-a410-a34c7703c19e', name: 'spoons, tea', orgId: exports.orgs[0].id, description: 'stainless steel, set of 6', cost: 17.99},
    {id: '87c9479e-d6c5-4634-9b9c-ade734b47150', name: 'spoons, soup', orgId: exports.orgs[0].id, description: 'stainless steel, set of 4', cost: 17.99},
    {id: '9bc22d95-9b44-4364-b3fe-4549f6c2e526', name: 'knives, butter', orgId: exports.orgs[0].id, description: 'stainless steel, set of 6', cost: 14.99},
    {id: '4e0d697b-8dd2-4fd1-ad5d-5306da2dc16d', name: 'knives, steak', orgId: exports.orgs[0].id, description: 'stainless steel, ea.', cost: 4.99},
    {id: 'c48cef44-7075-4ef3-8416-380cb7286faa', name: 'yo-yo', orgId: exports.orgs[1].id, description: 'red, embossed', cost: 12.50},
    {id: 'f2b86d28-1bf0-49f0-beac-4f691559c808', name: 'jigsaw puzzle', orgId: exports.orgs[1].id, description: '1000 pc.', cost: 19.98},
    {id: '3195ba4e-ef00-4c0c-9e94-3c3def2452dc', name: 'hula hoop', orgId: exports.orgs[1].id, description: 'purple, 1m dia.', cost: 8.00}
];