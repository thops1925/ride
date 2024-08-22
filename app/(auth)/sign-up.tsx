import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  ///////////////////////////////////
  const signupPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification({ ...pendingVerification, state: "pending" });
    } catch (err: any) {
      Alert.alert("", err.errors[0].longMessage);
    }
  };
  //////////////////////////////////////
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: pendingVerification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setPendingVerification({ ...pendingVerification, state: "success" });
      } else {
        setPendingVerification({
          ...pendingVerification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      const errorMessage = err.errors[0].longMessage;
      setPendingVerification({
        ...pendingVerification,
        error: errorMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[230px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-1 left-5">
            Create Account
          </Text>
        </View>
        <View className="p-3">
          <InputField
            label="Name"
            placeholder="Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: string) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter Your Password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value: string) =>
              setForm({ ...form, password: value })
            }
          />
          <CustomButton
            title="Sign Up"
            className="mt-5"
            onPress={signupPress}
          />
          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-5"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500"> Log In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={pendingVerification.state === "pending"}
          onModalHide={() =>
            setPendingVerification({ ...pendingVerification, state: "success" })
          }
        >
          <View className="bg-white py-9 px-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaSemiBold mb-2">
              Verification
            </Text>
            <Text className="font-JakartaMedium mb-5">
              We sent a verification code to {form.email}
            </Text>

            <InputField
              label="Code"
              placeholder="12345"
              value={pendingVerification.code}
              keyboardType="numeric"
              icon={icons.lock}
              onChangeText={(code) =>
                setPendingVerification({ ...pendingVerification, code })
              }
            />
            {pendingVerification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {pendingVerification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              className="mt-4 bg-success-500"
              onPress={onPressVerify}
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={pendingVerification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaSemiBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Home"
              className="mt-5"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
