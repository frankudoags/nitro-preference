package com.margelo.nitro.nitropreferences

import com.margelo.nitro.core.Promise

class HybridPreference: HybridPreferenceSpec() {
    override fun getString(key: String): Promise<StringOutput> {
        TODO("Not yet implemented")
    }

    override fun setString(
        key: String,
        value: String
    ): Promise<Unit> {
        TODO("Not yet implemented")
    }

    override fun getNumber(key: String): Promise<NumberOutput> {
        TODO("Not yet implemented")
    }

    override fun setNumber(
        key: String,
        value: Double
    ): Promise<Unit> {
        TODO("Not yet implemented")
    }

    override fun getBool(key: String): Promise<BoolOutput> {
        TODO("Not yet implemented")
    }

    override fun setBool(
        key: String,
        value: Boolean
    ): Promise<Unit> {
        TODO("Not yet implemented")
    }

    override fun remove(key: String): Promise<Unit> {
        TODO("Not yet implemented")
    }

    override fun clear(): Promise<Unit> {
        TODO("Not yet implemented")
    }
}