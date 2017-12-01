import React from 'react'
import PropTypes from 'prop-types'

import {Animated, Linking, Dimensions, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native'
import {priceDisplay} from '../util'
import ajax from '../ajax'

export default class DealDetail extends React.Component {
    imageXPos = new Animated.Value(0)
    imagePanResponser = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
            this.imageXPos.setValue(gs.dx)
        },
        onPanResponderRelease: (evt, gs) => {
            this.width = Dimensions.get('window').width
            if (Math.abs(gs.dx) > this.width * 0.4) {
                const direction = Math.sign(gs.dx)
                // swipe left
                Animated.timing(
                    this.imageXPos, {
                        toValue: direction * this.width,
                        duration: 250
                    }
                ).start(() => this.handleSwipe(-1 * direction))
            } else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start()
            }


        }
    })

    handleSwipe = (indexDirection) => {
        if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start()
            return
        }
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            this.imageXPos.setValue(indexDirection * this.width)
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start()
        })
    }

    static propTypes = {
        initialDealData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired
    }

    state = {
        deal: this.props.initialDealData,
        imageIndex: 0
    }

    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDeatil(this.state.deal.key)
        console.log(fullDeal)
        this.setState({deal: fullDeal})
    }

    openDealUrl = () => {
        Linking.openURL(this.state.deal.url)
    }

    render() {

        const {deal} = this.state
        return (
            <View style={styles.deal}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backLink}>Back</Text>
                </TouchableOpacity>
                <Animated.Image
                    {...this.imagePanResponser.panHandlers}
                    source={{uri: deal.media[this.state.imageIndex]}}
                    style={[{left: this.imageXPos}, styles.image]}
                />
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
                <Button title="Buy this deal!" onPress={this.openDealUrl} />
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
    detail: {
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