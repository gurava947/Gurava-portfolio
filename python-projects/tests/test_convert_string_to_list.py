import unittest

from support import run_solution


class ConvertStringToListTest(unittest.TestCase):
    def test_case_01_abc(self):
        """abc."""
        result = run_solution('convert-string-to-list', 'abc\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')

    def test_case_02_hello(self):
        """hello."""
        result = run_solution('convert-string-to-list', 'hello\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '')


if __name__ == "__main__":
    unittest.main()
