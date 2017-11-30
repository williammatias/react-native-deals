import React from 'react'

import {StyleSheet, TextInput} from 'react-native'
import PropTypes from "prop-types";
import debounce from 'lodash.debounce'
export default class SearchBar extends React.Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired,
    }
    state = {
        searchTerm: '',
    }

    debounceSearchDeals = debounce(this.props.searchDeals, 3000)

    handleChange = (searchTerm) => {
        this.setState({searchTerm}, () => {
            this.debounceSearchDeals(this.state.searchTerm)
        })
    }

    render() {
        return (
            <TextInput
                placeholder="Search All Deals"
                onChangeText={this.handleChange}
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