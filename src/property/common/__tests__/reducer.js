import propertyReducer from "../../common/reducer";
import { ACTION_TYPES } from "./../../common/actions";

const initialState = {
  isFetching: false,
  categories: ["Villa", "Apartment", "Chalet"],
  amenities: ["Swimming Pool", "Ocean View", "Sauna"],
  types: ["For Sale", "For Rent"],
  error: null,
  nextPageUrl: undefined,
  nextPageFavoritesUrl: undefined,
  results: [],
  filters: {
    priceFromArr: [
      "Any",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900"
    ],
    priceToArr: [
      "Any",
      "250",
      "350",
      "450",
      "550",
      "650",
      "750",
      "850",
      "1000"
    ],
    bedroomsArr: ["Any", "Studio", "1", "1+", "2", "2+", "3", "3+", "4", "4+"],
    bathroomsArr: ["Any", "1", "1+", "2", "2+", "3", "3+", "4", "4+"],
    parkingArr: ["Any", "1", "1+", "2", "2+", "3", "3+", "4", "4+"],
    priceFrom: "Any",
    priceTo: "Any",
    parking: "Any",
    bedroom: "Any",
    bathroom: "Any",
    category: "Any",
    sortOptions: ["New", "Cheap", "Pricey", "Old"],
    sortBy: "New",
    searchString: ""
  },
  listings: {
    filters: {
      bedroomsArr: ["Studio", "1", "2", "3", "4", "5", "6", "7", "7+"],
      bathroomsArr: ["1", "2", "3", "4", "5", "6", "7", "7+"],
      parkingArr: ["N/A", "1", "2", "3", "4", "4+"]
    },
    done: false,
    stage: 1,
    attributes: {
      type: "For Sale",
      category: "Villa",
      title: "3 bedrooms apartment in Jabriya",
      description: "Beautiful new apartment from rent in Jabriya near McDonalds",
      price: "200",
      address: {
        city: "Kuwait City",
        state: "Kuwait City",
        country: "Kuwait",
        latitude: 29.3667,
        longitude: 47.9667
      },
      meta: {
        bedroom: "Studio",
        bathroom: "1",
        kitchen: "1",
        area: "220.5",
        parking: "1"
      },
      images: [],
      amenities: ["Swimming Pool"]
    }
  }
};

describe("Property Component Store", () => {
  let payload = {
    data: {
      next_page_url: null,
      data: [
        {
          _id: "589721ccf7415600dc786661",
          type: "For Sale",
          category: "Villa",
          title: "title",
          description: "description",
          price: 200,
          meta: {
            bedroom: 1,
            bathroom: 1,
            kitchen: 1,
            parking: 1,
            area: 220.5
          },
          address: {
            state: "",
            city: "",
            latitude: 29.3667,
            longitude: 47.9667
          },
          amenities: ["Swimming Pool"],
          updated_at: "2017-02-05 12:59:56",
          created_at: "2017-02-05 12:59:56",
          isFavorited: false,
          user: {
            _id: "5856b4e3f741562249268db1",
            name: "Ideas Owners"
          }
        }
      ]
    }
  };

  test("property request", () => {
    expect(
      propertyReducer(initialState, { type: ACTION_TYPES.PROPERTY_REQUEST })
    ).toEqual({
      ...initialState,
      isFetching: true,
      error: null
    });
  });

  test("property success", () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.PROPERTY_SUCCESS,
        payload: payload.data
      })
    ).toEqual({
      ...initialState,
      results: ["589721ccf7415600dc786661"],
      nextPageUrl: null
    });
  });

  test("property failure", () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.PROPERTY_FAILURE,
        error: "error"
      })
    ).toEqual({
      ...initialState,
      isFetching: false,
      error: "error"
    });
  });

  test("property reset", () => {
    let state = {
      ...initialState,
      results: ["589721ccf7415600dc786661"],
      nextPageUrl: "http://abc.com"
    };

    expect(
      propertyReducer(state, { type: ACTION_TYPES.PROPERTY_RESET })
    ).toEqual({
      ...state,
      results: [],
      nextPageUrl: undefined
    });
  });

  test("filter change", () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.FILTER_CHANGE,
        field: "bedroom",
        value: "2"
      })
    ).toEqual({
      ...initialState,
      filters: {
        ...initialState.filters,
        bedroom: "2"
      }
    });
  });

  test("filter reset", () => {
    expect(
      propertyReducer(initialState, { type: ACTION_TYPES.FILTER_RESET })
    ).toEqual({
      ...initialState
    });
  });

  test("favorite success", () => {
    let payload = {
      data: {
        next_page_url: null,
        data: [
          {
            _id: "589721ccf7415600dc786661",
            type: "For Sale"
          },
          {
            _id: "589721ccf7415600dc786662",
            type: "For Rent"
          }
        ]
      }
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.FAVORITES_SUCCESS,
        payload: payload.data,
        nextPageFavoritesUrl: null
      })
    ).toEqual({
      ...initialState,
      results: ["589721ccf7415600dc786661", "589721ccf7415600dc786662"],
      nextPageFavoritesUrl: null
    });
  });

  test("property failure", () => {
    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.FAVORITES_FAILURE,
        error: "error"
      })
    ).toEqual({
      ...initialState,
      isFetching: false,
      error: "error"
    });
  });

  test("listing changes stage", () => {
    let payload = {
      stage: 5
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      listings: {
        ...initialState.listings,
        stage: 5
      }
    });
  });
  test("listing changes property infos ex:title,description,category", () => {
    let payload = {
      attributes: {
        title: "New Property",
        category: "Villa"
      }
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          title: "New Property",
          category: "Villa"
        }
      }
    });
  });

  test("listing changes property address", () => {
    let payload = {
      attributes: {
        address: {
          city: "Salwa",
          country: "Kuwait"
        }
      }
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          address: {
            ...initialState.listings.attributes.address,
            city: "Salwa",
            country: "Kuwait"
          }
        }
      }
    });
  });

  test("listing changes property metas", () => {
    let payload = {
      attributes: {
        meta: {
          bedroom: "1",
          bathroom: "1"
        }
      }
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          meta: {
            ...initialState.listings.attributes.meta,
            bedroom: "1",
            bathroom: "1"
          }
        }
      }
    });
  });

  test("listing adds images", () => {
    let payload = {
      replace: true,
      key: "images",
      item: ["ABC.png", "BCD.png", "ABC.png"]
    };

    expect(
      propertyReducer(initialState, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          images: ["ABC.png", "BCD.png"]
        }
      }
    });
  });

  test("listing removes image", () => {
    let payload = {
      replace: true,
      key: "images",
      item: "ABC.png"
    };

    let state = {
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          images: ["ABC.png", "BCD.png"]
        }
      }
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          images: ["BCD.png"]
        }
      }
    });

    // check mutation
    let oldState = state.listings.attributes.images;
    expect(oldState).toEqual(["ABC.png", "BCD.png"]);
  });

  test("listing adds amenities", () => {
    let state = {
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          amenities: ["Sauna"]
        }
      }
    };

    let payload = {
      replace: true,
      key: "amenities",
      item: "Swimming Pool"
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...state,
      listings: {
        ...state.listings,
        attributes: {
          ...state.listings.attributes,
          amenities: ["Sauna", "Swimming Pool"]
        }
      }
    });
  });

  test("listing removes amenities", () => {
    let state = {
      ...initialState,
      listings: {
        ...initialState.listings,
        attributes: {
          ...initialState.listings.attributes,
          amenities: ["Sauna", "Swimming Pool"]
        }
      }
    };

    let payload = {
      replace: true,
      key: "amenities",
      item: "Swimming Pool"
    };

    expect(
      propertyReducer(state, {
        type: ACTION_TYPES.LISTING_UPDATE_ITEM,
        payload: payload
      })
    ).toEqual({
      ...state,
      listings: {
        ...state.listings,
        attributes: {
          ...state.listings.attributes,
          amenities: ["Sauna"]
        }
      }
    });
  });
});
