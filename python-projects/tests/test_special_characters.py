import unittest

from support import run_solution


class SpecialCharactersTest(unittest.TestCase):
    def test_case_01_hello_world(self):
        """hello world."""
        result = run_solution('special-characters', 'hello world\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '3\n7\n')

    def test_case_02_aeiou(self):
        """aeiou."""
        result = run_solution('special-characters', 'aeiou\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '5\n0\n')


if __name__ == "__main__":
    unittest.main()
