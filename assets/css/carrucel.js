import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const carucelEstilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  carouselItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: screenWidth,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
    marginVertical: 20,
  },
  carouselDescription: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  pagination: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#bdc3c7",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#2c3e50",
  },
});

export default carucelEstilo;