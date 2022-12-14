#include "util.hpp"

#ifdef _WIN32
#define WIN32_LEAN_AND_MEAN
#include <Windows.h>
#endif

namespace util {

#ifdef _WIN32
std::wstring s2ws(const std::string& src) {
    if (src.empty()) return {};
    int size = MultiByteToWideChar(CP_UTF8, 0,
                                   src.c_str(), static_cast<int>(src.size()),
                                   nullptr, 0);
    if (size == 0) return {};
    std::wstring v(size, 0);
    size = MultiByteToWideChar(CP_UTF8, 0,
                               src.c_str(), static_cast<int>(src.size()),
                               v.data(), static_cast<int>(v.size()));
    if (size == 0) return {};
    return v;
}
#else
std::wstring s2ws(const std::string&) {
    return {};
}
#endif

std::string copyString(char* src) {
    std::string v(src);
    free(src);
    return v;
}

}
