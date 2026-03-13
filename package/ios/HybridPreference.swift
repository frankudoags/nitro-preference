import Foundation

import NitroModules

class HybridPreference: HybridPreferenceSpec {
    func getString(key: String) throws -> NitroModules.Promise<StringOutput> {
        return Promise.async {
            if let value = UserDefaults.standard.string(forKey: key) {
                return .second(value)
            } else {
                return .first(NullType.null)
            }
        }
    }
    
    func setString(key: String, value: String) throws -> NitroModules.Promise<Void> {
        return Promise.async {  
            UserDefaults.standard.set(value, forKey: key)
        }
    }
    
    func getNumber(key: String) throws -> NitroModules.Promise<NumberOutput> {
        return Promise.async {
            if let _ = UserDefaults.standard.object(forKey: key) {
                return .second(UserDefaults.standard.double(forKey: key))
            } else {
                return .first(NullType.null)
            }
        }
    }
    
    func setNumber(key: String, value: Double) throws -> NitroModules.Promise<Void> {
        return Promise.async {
            UserDefaults.standard.set(value, forKey: key)
        }
    }
    
    func getBool(key: String) throws -> NitroModules.Promise<BoolOutput> {
        return Promise.async {
            if let _ = UserDefaults.standard.object(forKey: key) {
                return .second(UserDefaults.standard.bool(forKey: key))
            } else {
                return .first(NullType.null)
            }
        }
    }
    
    func setBool(key: String, value: Bool) throws -> NitroModules.Promise<Void> {
        return Promise.async {
            UserDefaults.standard.set(value, forKey: key)
        }
    }
    
    func remove(key: String) throws -> NitroModules.Promise<Void> {
        return Promise.async {
            UserDefaults.standard.removeObject(forKey: key)
        }
    }
    
    func clear() throws -> NitroModules.Promise<Void> {
        return Promise.async {
            if let bundleID = Bundle.main.bundleIdentifier {
                UserDefaults.standard.removePersistentDomain(forName: bundleID)
            }
        }
    }
    
    
}
