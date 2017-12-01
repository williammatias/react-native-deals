import React from 'react'

import {StyleSheet, TextInput} from 'react-native'
import PropTypes from "prop-types";
import debounce from 'lodash.debounce'
export default class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
        initialSearchTerm: PropTypes.string.isRequired
    }
    state = {
        searchTerm: this.props.initialSearchTerm,
    }

    searchDeals = (searchTerm) => {
        this.props.searchDeals(searchTerm)
        this.inputElement.blur()
    }

    debounceSearchDeals = debounce(this.searchDeals, 3000)

    handleChange = (searchTerm) => {
        this.setState({searchTerm}, () => {
            this.debounceSearchDeals(this.state.searchTerm)
        })
    }

    render() {
        return (
            <TextInput
                ref={(inputElement)=>{this.inputElement = inputElement}}
                placeholder="Search All Deals"
                onChangeText={this.handleChange}
                value={this.state.searchTerm}
                style={styles.input}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12
    }
})