import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  textFieldBox: {
    width: 318,
    height: 44,
    backgroundColor: "#404040",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  textFieldPlacement: {
    fontFamily: "Open Sans Regular",
    fontSize: 15,
  },
  button: {
    width: 110,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientButton: {
    backgroundColor: "linear-gradient(180deg, #1375C1 0%, #61AEE9 100%)",
  },
  logo: {
    width: 227,
    height: 227,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: "Open Sans Bold",
    color: "#0A84FF",
  },
});
