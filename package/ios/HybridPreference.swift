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

    func setString(key: String, value: String) throws
        -> NitroModules.Promise<Void>
    {
        return Promise.async {
            UserDefaults.standard.set(value, forKey: key)
        }
    }

    func getNumber(key: String) throws -> NitroModules.Promise<NumberOutput> {
        return Promise.async {
            if UserDefaults.standard.object(forKey: key) != nil {
                return .second(UserDefaults.standard.double(forKey: key))
            } else {
                return .first(NullType.null)
            }
        }
    }

    func setNumber(key: String, value: Double) throws
        -> NitroModules.Promise<Void>
    {
        return Promise.async {
            UserDefaults.standard.set(value, forKey: key)
        }
    }

    func getBool(key: String) throws -> NitroModules.Promise<BoolOutput> {
        return Promise.async {
            if UserDefaults.standard.object(forKey: key) != nil {
                return .second(UserDefaults.standard.bool(forKey: key))
            } else {
                return .first(NullType.null)
            }
        }
    }

    func setBool(key: String, value: Bool) throws -> NitroModules.Promise<Void>
    {
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

    func getAll() throws -> NitroModules.Promise<[PreferenceEntry]> {
        return Promise.async {
            guard let bundleIdentifier = Bundle.main.bundleIdentifier,
                let dict = UserDefaults.standard.persistentDomain(
                    forName: bundleIdentifier
                )
            else { return [] }

            return dict.compactMap { (key, rawValue) -> PreferenceEntry? in
                if let v = rawValue as? String {
                    return PreferenceEntry(
                        key: key,
                        stringValue: .second(v),
                        numberValue: nil,
                        boolValue: nil
                    )
                }
                // Check CFBoolean before NSNumber — Bool bridges through NSNumber on ObjC
                if let v = rawValue as? Bool {
                    return PreferenceEntry(
                        key: key,
                        stringValue: nil,
                        numberValue: nil,
                        boolValue: .second(v)
                    )
                }
                if let v = rawValue as? Double {
                    return PreferenceEntry(
                        key: key,
                        stringValue: nil,
                        numberValue: .second(v),
                        boolValue: nil
                    )
                }
                return nil
            }.sorted { $0.key < $1.key }

        }
    }
}
