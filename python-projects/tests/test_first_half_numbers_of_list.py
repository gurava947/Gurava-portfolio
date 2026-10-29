import unittest

from support import run_solution


class FirstHalfNumbersOfListTest(unittest.TestCase):
    def test_case_01_even_count(self):
        """even count."""
        result = run_solution('first-half-numbers-of-list', '1 2 3 4\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 2]\n')

    def test_case_02_odd_count(self):
        """odd count."""
        result = run_solution('first-half-numbers-of-list', '1 2 3\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '[1, 2]\n')


if __name__ == "__main__":
    unittest.main()
