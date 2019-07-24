import Redux from "redux";
export interface DataState {
    
}

export type DataAction = undefined // UserAction | OrganizationsAction | ChannelsAction | RulesetsAction | RecordingsAction;

export const dataInitialState: DataState = {
};

const dataReducer: Redux.Reducer<DataState> = (store = dataInitialState, action) => {
    return {
    };
};

export default dataReducer;
