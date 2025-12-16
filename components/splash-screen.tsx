import React, { useEffect } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

type Props = {
  onFinish?: () => void;
  duration?: number;
};

export default function SplashScreen({ onFinish, duration = 1400 }: Props) {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const scale = React.useRef(new Animated.Value(0.9)).current;

  const textOpacity1 = React.useRef(new Animated.Value(0)).current;
  const textTranslate1 = React.useRef(new Animated.Value(8)).current;

  const textOpacity2 = React.useRef(new Animated.Value(0)).current;
  const textTranslate2 = React.useRef(new Animated.Value(8)).current;

  useEffect(() => {
    const logoAnim = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 7,
        tension: 40,
        useNativeDriver: true,
      }),
    ]);

    const text1 = Animated.parallel([
      Animated.timing(textOpacity1, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslate1, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    const text2 = Animated.parallel([
      Animated.timing(textOpacity2, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslate2, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }),
    ]);

    Animated.sequence([
      logoAnim,
      Animated.stagger(120, [text1, text2]),
    ]).start(() => {
      const t = setTimeout(() => onFinish && onFinish(), 300);
      return () => clearTimeout(t);
    });
  }, [duration, onFinish, opacity, scale, textOpacity1, textTranslate1, textOpacity2, textTranslate2]);

  return (
    <Animated.View style={[styles.container, { opacity }]}> 
      <Animated.View style={{ alignItems: 'center', transform: [{ scale }] }}>
        <Image
          source={require('../assets/images/MYFINANCES-LOGO.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={{ height: 18 }} />

        <Animated.Text
          style={[
            styles.line1,
            { opacity: textOpacity1, transform: [{ translateY: textTranslate1 }] },
          ]}
        >
          My
        </Animated.Text>

        <Animated.Text
          style={[
            styles.line2,
            { opacity: textOpacity2, transform: [{ translateY: textTranslate2 }] },
          ]}
        >
          Finances
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171616',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  line1: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },
  line2: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 2,
  },
});
