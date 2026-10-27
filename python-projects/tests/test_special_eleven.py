import unittest

from support import run_solution


class SpecialElevenTest(unittest.TestCase):
    def test_case_01_22_gives_remainder_0(self):
        """22 gives remainder 0."""
        result = run_solution('special-eleven', '22\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special Eleven\n')

    def test_case_02_23_gives_remainder_1(self):
        """23 gives remainder 1."""
        result = run_solution('special-eleven', '23\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special Eleven\n')

    def test_case_03_25_gives_remainder_3(self):
        """25 gives remainder 3."""
        result = run_solution('special-eleven', '25\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Normal Number\n')

    def test_case_04_0_gives_remainder_0(self):
        """0 gives remainder 0."""
        result = run_solution('special-eleven', '0\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Special Eleven\n')


if __name__ == "__main__":
    unittest.main()
