import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const signIn = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const signInPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[230px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[200px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-1 left-5">
            Welcome Back
          </Text>
        </View>
        <View className="p-3">
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
            onPress={signInPress}
          />
          <OAuth />

          <Link
            href="/sign-up"
            className={`text-lg text-center text-general-200 mt-5`}
          >
            <Text>Don't have an account? </Text>
            <Text className={`text-primary-500`}>Sign up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};
export default signIn;
