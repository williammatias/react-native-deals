/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ajax from '../ajax'
import DealList from "./DealList";
import DealDetail from "./DealDetail";
import SearchBar from "./SearchBar";

export default class App extends Component<{}> {
    state = {
        deals: [],
        dealsFormSearch: [],
        currentDealId: null,
    }

    setCurrentDeal = (dealId) => {
        this.setState({
            currentDealId: dealId
        })
    }

    unsetCurrentDeal = () => {
        this.setState({
            currentDealId: null
        })
    }

    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals()
        this.setState({deals})
    }

    searchDeals = async (searchTerm) => {
        let dealsFormSearch = []
        if (searchTerm) {
            dealsFormSearch = await ajax.fetchDealsSearchResults(searchTerm)
        }
        this.setState({dealsFormSearch})
    }

    currentDeal = () => {
        return this.state.deals.find(
            (deal) => deal.key === this.state.currentDealId
        )
    }

    render() {
        if (this.state.currentDealId) {
            return <DealDetail
                style={styles.main}
                initialDealData={this.currentDeal()}
                onBack={this.unsetCurrentDeal}
            />
        }
        const dealsToDisplay = this.state.dealsFormSearch.length > 0
            ? this.state.dealsFormSearch
            : this.state.deals
        if (this.state.deals.length > 0) {
            return (
                <View style={styles.main}>
                    <SearchBar searchDeals={this.searchDeals}/>
                    <DealList
                        deals={dealsToDisplay}
                        onItemPress={this.setCurrentDeal}
                    />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Bakesale
                </Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    main: {
        marginTop: 30,
        height: '100%'
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
    },
});
