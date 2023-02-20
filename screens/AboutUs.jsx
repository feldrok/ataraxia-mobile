import { Button, FlatList, Image, SectionList, Text, View } from 'react-native'

import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

function AboutUs() {
    return (
        <>
        <ScrollView>
            <SafeAreaView className="h-100 flex flex-col items-center justify-center">
                <Text className="max-w-md flex-wrap pb-6 text-center text-5xl font-bold text-primary-500">
                    Nuestra Cervecería
                </Text>
                <Image
                    source={require('../assets/ataraxia-signupbanner.png')}
                    alt="ataraxia banner"
                    className=" h-96 w-full object-cover"
                />
            </SafeAreaView>
            <SafeAreaView className="flex flex-col items-center justify-center p-10 pb-0">
            <View className="border-[1px] w-full border-black"></View>
                <Text className="pb-1 italic self-end py-4">
                    <Text className="font-bold not-italic text-primary-500">
                        Ataraxia.
                    </Text>{' '}
                    Palabra proveniente del griego ἀ (a = sin) + ταραχή (taraji
                    = alteración); tranquilidad, serenidad, paz de espíritu.
                </Text>
                <View className="border-[1px] w-full border-black"></View>
                <View className="flex w-full flex-col items-center justify-center pb-5 text-xl indent-5 gap-5 py-10">
                    <Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Rem dolor, commodi quasi tempore accusamus eos, facilis
                        hic minus libero, odit doloremque. Architecto aperiam
                        autem ipsum sit nisi dolorum, numquam consequuntur. Rem
                        dicta blanditiis esse perferendis dolore nisi, eveniet
                        similique sequi, fugiat suscipit reprehenderit vero.
                        Odio culpa ex ipsum non, commodi deleniti recusandae,
                        expedita velit officiis dolor voluptatem at, aliquam
                        quisquam!
                    </Text>
                    <Text>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Impedit ratione incidunt sint commodi eaque
                        quidem, a voluptatibus nam facilis animi eos deserunt
                        dolorum iure sed harum eius adipisci minima amet.
                    </Text>
                    <Text>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Magnam, quidem. Ipsam libero nobis dolorem soluta
                        distinctio necessitatibus nostrum sint. Temporibus
                        voluptatibus officiis ipsam totam facere quae, illum
                        nostrum! Debitis, officia? Sapiente, nihil totam!
                        Maiores, velit! Quibusdam, suscipit optio omnis, nemo
                        iste, fugiat voluptas neque enim odit illo officia vitae
                        repellat adipisci ut ipsam eum labore itaque ducimus
                        tempore aut est! Quod recusandae facilis, quisquam
                        deserunt voluptatibus nam beatae alias illo minima
                        labore aliquam quam voluptate? Vitae a esse fuga
                        expedita quasi sit veniam quam praesentium ipsa rem
                        culpa, libero veritatis.
                    </Text>
                </View>
                    <Text className="max-w-md flex-wrap pb-6 text-center text-4xl font-bold text-primary-500">Testimoniales</Text>
                <View className="mb-8 grid w-full gap-4 rounded-lg md:mb-12 md:grid-cols-2">
                    <View className=" w-full flex flex-col items-center justify-center rounded-md border-b bg-white p-8 text-center dark:border-black">
                        <View className="mx-auto mb-4 max-w-2xl lg:mb-8 ">
                            <Text className="my-4 text-2xl">
                                "La Stout es tan rica y refrescante que les
                                agoté el stock personalmente."
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center space-x-3">
                            <Image
                                className="h-9 w-9 rounded-full"
                                source={require('../assets/karen-nelson.png')}
                                alt="perfil de usuario"
                            />
                            <View className="space-y-0.5 text-left font-medium dark:text-black">
                                <Text>Lucrecia Gillone</Text>
                                <Text className="text-sm">
                                    Desarrolladora web
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className=" w-full flex flex-col items-center justify-center rounded-md border-b border-gray-200 bg-white p-8 text-center">
                        <View className="mx-auto mb-4 max-w-2xl">
                            <Text className="my-4 text-2xl">
                                "Esta marca se destaca no sólo por la calidad de
                                sus productos, sino también por su hermosa
                                presentación y diseño."
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center space-x-3">
                            <Image
                                className="h-9 w-9 rounded-full"
                                source={require('../assets/joseph-mcfall.png')}
                                alt="perfil de usuario"
                            />
                            <View className="space-y-0.5 text-left font-medium dark:text-black">
                                <Text>Martín Ticinese</Text>
                                <Text className="text-sm">CEO de Quilmes</Text>
                            </View>
                        </View>
                    </View>
                    <View className=" w-full flex flex-col items-center justify-center rounded-md border-b border-gray-200 bg-white p-8 text-center dark:border-black">
                        <View className="mx-auto mb-4 max-w-2xl">
                            <Text className="my-4 text-2xl">
                                "A nivel user experience, Ataraxia nos ofrece
                                una página de e-commerce clara, concisa, y
                                accesible. Muy recomendable."
                            </Text>
                        </View>
                        <View className="flex flex-row items-center justify-center space-x-3">
                            <Image
                                className="h-9 w-9 rounded-full"
                                source={require('../assets/jese-leos.png')}
                                alt="perfil de usuario"
                            />
                            <View className="space-y-0.5 text-left font-medium dark:text-black">
                                <Text>Lucas Ezequiel Silva</Text>
                                <Text className="text-sm">Desarrollador UI/UX</Text>
                            </View>
                        </View>
                    </View>
                    <View className=" w-full flex flex-col items-center justify-center rounded-md border-gray-200 bg-white p-8 text-center dark:border-black">
                        <Text className="mx-auto mb-4 max-w-2xl">
                            <Text className="my-4 text-2xl">
                                "Ataraxia? No es esa la enfermedad que te traba
                                los músculos y no te podés mover?"
                            </Text>
                        </Text>
                        <View className="flex flex-row items-center justify-center space-x-3">
                            <Image
                                className="h-9 w-9 rounded-full"
                                source={require('../assets/roberta-casas.png')}
                                alt="perfil de usuario"
                            />
                            <View className="space-y-0.5 text-left font-medium dark:text-black">
                                <Text>Katie Gonzalez</Text>
                                <Text className="text-sm">
                                    Esposa de Ariel Gonzalez
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            </ScrollView>
        </>
    )
}

export default AboutUs