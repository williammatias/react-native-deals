import React from 'react'
import PropTypes from 'prop-types'

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {priceDisplay} from '../util'
import ajax from '../ajax'

export default class DealDetail extends React.Component {
    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }

    state = {
        deal: this.props.initialDealData
    }

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDeatil(this.state.deal.key)
        console.log(fullDeal)
        this.setState({deal: fullDeal})
    }

    render() {

        const {deal} = this.state
        return (
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Image source={{uri: deal.media[0]}}
                       style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.cause}>{deal.cause.name}</Text>
                        <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                    </View>
                    {deal.user && (
                        <View>
                            <Image source={{uri: deal.user.avatar}} style={styles.avatar}/>
                            <Text>{deal.user.name}</Text>
                        </View>
                    )}
                </View>

                <View>
                    <Text>{deal.description}</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    deal: {
        marginHorizontal: 12,
        marginTop: 50
    },
    backLink: {
      marginBottom: 5,
      color: '#22f'
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc'

    },
    detail:{
        borderColor: '#bbb',
        borderWidth: 1
    },
    info: {
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#f1c40f'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15
    },
    cause: {
        flex: 2
    },
    price: {
        flex: 1,
        textAlign: 'right'

    },
    avatar: {
        width: 60,
        height: 60
    }
})