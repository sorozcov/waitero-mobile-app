/* -------------------------------------------------------------------------- */
/*                                Reducer Index                               */
/* -------------------------------------------------------------------------- */
// Este reducer contiene un combine reducer de todos los demás reductores.

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { alertReducer } from 'redux-saga-rn-alert';
import _ from 'lodash';
import auth, * as authSelectors from './auth';
import signUp, * as signUpSelectors from './signUp';
import orders, * as ordersSelectors from './orders';
import products, * as productsSelectors from './products';
import categories, * as categoriesSelectors from './categories';
import loggedUser, * as loggedUserSelectors from './loggedUser';

import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';

const reducer = combineReducers({
  auth,
  signUp,
  orders,
  products,
  categories,
  loggedUser,
  form: formReducer,
  alertReducer,
});


const rootReducer = (state, action) => {
  if (action.type === AUTHENTICATION_IDENTITY_CLEARED) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer;


//Logged User
export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const getIsAdminMode = state => loggedUserSelectors.getIsAdminMode(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);
export const getLoggedUserType = state => loggedUserSelectors.getLoggedUserType(state.loggedUser);

//Authorization Selectors
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUserInformation = state => authSelectors.getAuthUserInformation(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

//Signup Selectors
export const getIsSigningUpUser = state => signUpSelectors.getIsSigningUpUser(state.signUp);
export const getSigningUpError = state => signUpSelectors.getSigningUpError(state.signUp);


//Categories 
export const getCategory = (state, id) => categoriesSelectors.getCategory(state.categories, id);
export const getCategories = state => categoriesSelectors.getCategories(state.categories);
export const getCategorySelected = state => categoriesSelectors.getCategorySelected(state.categories);
export const isFetchingCategories = state => categoriesSelectors.isFetchingCategories(state.categories);
export const isCreatingCategory = state => categoriesSelectors.isCreatingCategory(state.categories);
export const isRemovingCategory = state => categoriesSelectors.isRemovingCategory(state.categories);
export const isEditingCategory = state => categoriesSelectors.isEditingCategory(state.categories);
export const getError = state => categoriesSelectors.getError(state.categories);

//Orders
export const getOrder = (state, id) => ordersSelectors.getOrder(state.orders, id);
export const getOrders = state => ordersSelectors.getOrders(state.orders);
export const getOrdersByDate = state => ordersSelectors.getOrders(state.orders).sort((o1, o2) => o1.date < o2.date);
export const getOrdersByTable = (state, orderStatus) => {
    let orders = getOrdersByDate(state).filter(order => orderStatus.includes(order.status));
    let ordersByTables = _.chain(orders).groupBy('table').map((value, key) => ({ title: `Mesa ${key}`, data: value, tableNumber: key })).value().sort((table1, table2) => parseInt(table1.tableNumber) > parseInt(table2.tableNumber))

    return ordersByTables;
};
export const getCreatedOrdersByTable = state => getOrdersByTable(state , [1]);
export const getDeliveredOrdersByTable = state => getOrdersByTable(state, [2]);
export const getCompletedOrdersByTable = state => getOrdersByTable(state, [3]);
export const getChargedOrdersByTable = state => getOrdersByTable(state, [4, 5]);
export const getSelectedOrder = state => ordersSelectors.getSelectedOrder(state.orders);

export const getSelectedOrderProducts = state => ordersSelectors.getSelectedOrderProducts(state.orders);

export const getSelectedOrderProductsByCategory = state => {
    let products = ordersSelectors.getSelectedOrderProducts(state.orders);
    let categories = getCategories(state);
    return categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    }).filter(category => category.data.length !== 0)
};

export const getNewOrder = state => ordersSelectors.getNewOrder(state.orders);

export const getNewOrderProducts = state => ordersSelectors.getNewOrderProducts(state.orders);

export const getNewOrderProductsByCategory = state => {
    let products = ordersSelectors.getNewOrderProducts(state.orders);
    let categories = getCategories(state);
    return categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    }).filter(category => category.data.length !== 0)
};

export const isFetchingOrders = state => ordersSelectors.isFetchingOrders(state.orders);
export const isAddingOrders = state => ordersSelectors.isAddingOrders(state.orders);
export const isEditingOrders = state => ordersSelectors.isEditingOrders(state.orders);
export const isRemovingOrders = state => ordersSelectors.isRemovingOrders(state.orders);
export const getOrdersError = state => ordersSelectors.getOrdersError(state.orders);

//Products
export const getProduct = (state, id) => productsSelectors.getProduct(state.products, id);
export const getProducts = state => productsSelectors.getProducts(state.products);
export const getSelectedProduct = state => productsSelectors.getSelectedProduct(state.products);
export const getSelectedProductIngredients = state => productsSelectors.getSelectedProductIngredients(state.products);
export const getSelectedProductAdditionals = state => productsSelectors.getSelectedProductAdditionals(state.products);
export const isFetchingProducts = state => productsSelectors.isFetchingProducts(state.products);
export const isAddingProducts = state => productsSelectors.isAddingProducts(state.products);
export const isEditingProducts = state => productsSelectors.isEditingProducts(state.products);
export const isRemovingProducts = state => productsSelectors.isRemovingProducts(state.products);
export const getProductsError = state => productsSelectors.getProductsError(state.products);

export const getProductsByCategory = state => {
    let categories = getCategories(state);
    let products = getProducts(state);
    let allCategories = categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    })
    return allCategories.filter(cat => cat.data.length > 0).sort((cat1, cat) => (cat1.title) > (cat.title))
};

export const getAllProductsByCategory = state => {
    let categories = getCategories(state);
    let products = getProducts(state);
    let allCategories = categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    })
    return allCategories.sort((cat1, cat) => (cat1.title) > (cat.title))
};
export const getSearchTextProduct = state => productsSelectors.getSearchTextProduct(state.products);

export const getProductsByCategoryActive = state => {

    let categories = getCategories(state);
    let products = getProducts(state).filter(product => product.status == true);
    // let products = getProducts(state).filter(product=>product.status==true && (product.productName.search(searchText)>-1 || searchText==""));
    let allCategories = categories.map(category => {
        return {
            title: category.categoryName,
            data: products.filter(product => product.categoryId === category.categoryId)
        }
    })

    let filteredSearchProducts = allCategories

    let searchText = getSearchTextProduct(state)
    allCategories.forEach((category, index) => {
        if (category.title.toLowerCase().search(searchText.toLowerCase()) == -1 && searchText != "") {
            filteredSearchProducts[index].data = category.data.filter(prod => prod.productName.toLowerCase().search(searchText.toLowerCase()) > -1 || searchText == "")
        } else {
            filteredSearchProducts[index].data = category.data;
        }
    });
    filteredSearchProducts = filteredSearchProducts.filter(cat => cat.data.length > 0)
    return filteredSearchProducts.sort((cat1, cat) => (cat1.title) > (cat.title))
};
